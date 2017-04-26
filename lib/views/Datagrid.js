import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withState, withHandlers, lifecycle, compose } from 'recompose';

const defaultStyles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  cells: {
    padding: '10px',
    border: '1px solid #333'
  },
  sortRow: {
    'float': 'right',
    marginBottom: '10px'
  },
  sortTag: {
    margin: '5px',
    padding: '5px',
    backgroundColor: '#CCC'
  },
  paginationRow: {
    textAlign: 'center',
    marginTop: '15px'
  }
};

const SortTag = ({ label, onRemove, style }) => {
  return (
    <span className="SortTag" onClick={() => onRemove(label)} style={style}>
      { label }
    </span>
  );
};
SortTag.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

const Datagrid = ({
  fields, models, options, pageState,
  onRemoveSort, onPageChange, onAddSort
}) => {
  const { userDefaultStyles = true } = options,
      { sorts, page, pageSize, total } = pageState,
      totalPages = Math.ceil(total / pageSize);
  return (
    <div className="Datagrid">
      <div className="sort-row" style={userDefaultStyles ? defaultStyles.sortRow : {} }>
        <span className="sorts-tags-label">Sorts:</span>
        { sorts.length === 0 ? 'None' : ''}
        { sorts.map((s, i) => (
          <SortTag label={s.label} onRemove={onRemoveSort} style={ userDefaultStyles ? defaultStyles.sortTag : {} } key={i} />
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
      </div>
    </div>
  );
};

Datagrid.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddSort: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRemoveSort: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  pageState: PropTypes.shape({
    sorts: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

export default compose(
  withState('pageState', 'setPageState', { page: 0, pageSize: 2, total: 0, sorts: [], loading: false }),
  withState('models', 'setModels', []),
  withHandlers({
    refresh: props => (newPageState) => {
      const { setPageState, setModels } = props,
          pageState = _.defaultTo(newPageState, props.pageState);
      if (!pageState.loading) {
        const { page, pageSize, sorts } = props.pageState,
            sort = sorts.map(s => s.value);
        pageState.loading = true;
        setPageState(pageState);
        props.supplier.findAll({ limit: pageSize, offset: page * pageSize, sort })
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
    onPageChange: props => newPage => {
      const { pageState, refresh } = props;
      pageState.page = newPage;
      refresh(pageState);
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.refresh();
    }
  })
)(Datagrid);
