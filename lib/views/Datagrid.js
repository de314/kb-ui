import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withState, withHandlers, lifecycle, compose } from 'recompose';

import NewFilterForm from './NewFilterForm'

const defaultStyles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  cells: {
    padding: '10px',
    border: '1px solid #333'
  },
  tagRow: {
    marginBottom: '10px'
  },
  removeableTag: {
    margin: '5px',
    padding: '5px',
    backgroundColor: '#CCC'
  },
  paginationRow: {
    textAlign: 'center',
    marginTop: '15px'
  }
};

const RemoveableTag = ({ label, onRemove, style }) => {
  return (
    <span className="RemoveableTag" onClick={() => onRemove(label)} style={style}>
      { label }
    </span>
  );
};
RemoveableTag.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};


const Datagrid = ({
  fields, models, options, pageState,
  showFilters, setShowFilters, onAddFilter, onRemoveFilter,
  onRemoveSort, onPageChange, onPageSizeChange, onAddSort
}) => {
  const { userDefaultStyles = true } = options,
      { sorts, filters, page, pageSize, total } = pageState,
      totalPages = Math.ceil(total / pageSize);
  return (
    <div className="Datagrid">
      <div className="filter-row" style={userDefaultStyles ? defaultStyles.tagRow : {} }>
        <span className="filters-tags-label">Filters:</span>
        { filters.length === 0 ? 'None' : ''}
        { filters.map((f, i) => (
          <RemoveableTag label={f.label} onRemove={onRemoveFilter} style={ userDefaultStyles ? defaultStyles.removeableTag : {} } key={i} />
        ))}
        <button onClick={() => setShowFilters(!showFilters)}>{showFilters ? 'Hide' : 'Show'} Filters</button>
      </div>
      <div className="sort-row" style={userDefaultStyles ? defaultStyles.tagRow : {} }>
        <span className="sorts-tags-label">Sorts:</span>
        { sorts.length === 0 ? 'None' : ''}
        { sorts.map((s, i) => (
          <RemoveableTag label={s.label} onRemove={onRemoveSort} style={ userDefaultStyles ? defaultStyles.removeableTag : {} } key={i} />
        ))}
      </div>
      <div className="table-row">
        <table style={userDefaultStyles ? defaultStyles.table : {}}>
          <thead>
            <tr>
              { fields.map((field, i) => (
                <th key={i} style={userDefaultStyles ? defaultStyles.cells : {}} onClick={() => onAddSort(i)}>
                  {field.options.label}
                </th>
              ))}
            </tr>
          </thead>
          { !showFilters ? (<tbody></tbody>) : (
            <tbody>
              <tr>
                {fields.map((field, i) => (
                  <td style={userDefaultStyles ? defaultStyles.cells : {}} key={i}>
                    <NewFilterForm field={field} onAddFilter={onAddFilter} />
                  </td>
                ))}
              </tr>
            </tbody>
          )}
          <tbody>
            { models.map((model, i) => (
              <tr key={i}>
                {fields.map((field, j) => (
                  <td style={userDefaultStyles ? defaultStyles.cells : {}} key={i + ':' + j}>
                    {field._render(model)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-row" style={userDefaultStyles ? defaultStyles.paginationRow : {}}>
        <button disabled={page === 0} onClick={() => onPageChange(page - 1)}>Prev</button>
        Page {page + 1} of { totalPages }
        <button disabled={page >= (totalPages - 1)} onClick={() => onPageChange(page + 1)}>Next</button>
        <select onChange={e => onPageSizeChange(e.target.value)} value={pageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

Datagrid.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddFilter: PropTypes.func.isRequired,
  onAddSort: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  onRemoveSort: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  pageState: PropTypes.shape({
    sorts: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  setShowFilters: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired
};

export default compose(
  withState('pageState', 'setPageState', { page: 0, pageSize: 10, total: 0, sorts: [], filters: [], loading: false }),
  withState('models', 'setModels', []),
  withHandlers({
    refresh: props => (newPageState) => {
      const { setPageState, setModels } = props,
          pageState = _.defaultTo(newPageState, props.pageState);
      if (!pageState.loading) {
        const { page, pageSize, sorts, filters } = props.pageState,
            sort = sorts.map(s => s.value);
        pageState.loading = true;
        setPageState(pageState);
        props.supplier.findAll({ limit: pageSize, offset: page * pageSize, sort, filter: filters })
            .then(res => {
              pageState.loading = false;
              pageState.total = res.total;
              setPageState(pageState);
              setModels(res.items);
            });
      }
    }
  }),
  withHandlers({
    onRemoveSort: props => sortLabel => {
      const { pageState, setPageState, refresh } = props;
      _.remove(pageState.sorts, s => s.label === sortLabel);
      setPageState(pageState);
      refresh();
    },
    onAddSort: props => fieldIndex => {
      const field = props.fields[fieldIndex];
      const { pageState, setPageState, refresh } = props;
      let newSort = _.find(pageState.sorts, s => s.i === fieldIndex);
      if (_.isUndefined(newSort)) {
        newSort = {
          i: fieldIndex,
          dir: -1
        };
        pageState.sorts.push(newSort);
      }
      newSort.dir *= -1;
      newSort.label = `${field.options.label} (${newSort.dir < 0 ? 'DESC' : 'ASC'})`;
      newSort.value = `${newSort.dir < 0 ? '-' : ''}${field.options.path}`;
      setPageState(pageState);
      refresh();
    },
    onRemoveFilter: props => filterLabel => {
      const { pageState, setPageState, refresh } = props;
      _.remove(pageState.filters, f => f.label === filterLabel);
      setPageState(pageState);
      refresh();
    },
    onAddFilter: props => newFilter => {
      const { pageState, setPageState, refresh } = props;
      pageState.filters.push(newFilter);
      refresh(pageState);
    },
    onPageChange: props => newPage => {
      const { pageState, refresh } = props;
      pageState.page = newPage;
      refresh(pageState);
    },
    onPageSizeChange: props => newPageSize => {
      const { pageState, refresh } = props;
      pageState.pageSize = newPageSize;
      refresh(pageState);
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.refresh();
    }
  }),
  withState('showFilters', 'setShowFilters', false)
)(Datagrid);
