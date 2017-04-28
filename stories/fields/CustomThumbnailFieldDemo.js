import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';
import kb from '../../lib/kb-ui'

import KbField from '../../lib/fields/KbField';
import ValueField from '../../lib/fields/ValueField';

import FieldsDemo from './FieldsDemo'

KbField._plugin('thumbnail', {
  field: ({model, options}) => {
    const url = _.at(model, options.url),
        src = _.at(model, options.src),
        header = options.header ? _.at(model, options.header) : undefined,
        description = options.description ? _.at(model, options.description) : undefined;
    return (
      <div>
        <ValueField options={options} valueType="custom-thumbnail">
          <div style={{ padding: '15px', border: '1px solid #ccc', textAlign: 'center' }}>
            { _.isUndefined(header) ? '' : (<h3>{header}</h3>)}
            <a href={url} target="_blank">
              <img src={src} style={{ width: "64px", height: "64px" }} />
            </a>
            <p>
              { _.isUndefined(description) ? '' : (<em>{description}</em>)}
            </p>
          </div>
        </ValueField>
      </div>
    )
  }
});

KbField._setter('url');
KbField._setter('src');
KbField._setter('header');
KbField._setter('description');

const model = {
  id: 0,
  email: 'david@test.com',
  name: 'David E',
  title: 'Software Engineer',
  profile: {
    avatar: {
      url: 'https://robohash.org/david@test.com?size=64x64'
    },
    website: {
      href: 'https://github.com/de44',
      text: 'de44 (github)'
    }
  }
};

const fields = [
  kb.field('', 'thumbnail').raw(false).label('No text').url('profile.website.href').src('profile.avatar.url'),
  kb.field('', 'thumbnail').label('With Description').url('profile.website.href').src('profile.avatar.url').description('title'),
  kb.field('', 'thumbnail').label('With Header').url('profile.website.href').src('profile.avatar.url').header('name'),
  kb.field('', 'thumbnail').label('With Everything').url('profile.website.href').src('profile.avatar.url').header('name').description('title')
];

const fieldsDef = `KbField._plugin('thumbnail', {
  field: ({model, options}) => {
    const url = _.at(model, options.url),
        src = _.at(model, options.src),
        header = options.header ? _.at(model, options.header) : undefined,
        description = options.description ? _.at(model, options.description) : undefined;
    return (
      <div>
        <ValueField options={options} valueType="custom-thumbnail">
          <div style={{ padding: '15px', border: '1px solid #ccc', textAlign: 'center' }}>
            { _.isUndefined(header) ? '' : (<h3>{header}</h3>)}
            <a href={url} target="_blank">
              <img src={src} style={{ width: "64px", height: "64px" }} />
            </a>
            <p>
              { _.isUndefined(description) ? '' : (<em>{description}</em>)}
            </p>
          </div>
        </ValueField>
      </div>
    )
  }
});

KbField._setter('url');
KbField._setter('src');
KbField._setter('header');
KbField._setter('description');

const model = {
  id: 0,
  email: 'david@test.com',
  name: 'David E',
  title: 'Software Engineer',
  profile: {
    avatar: {
      url: 'https://robohash.org/david@test.com?size=64x64'
    },
    website: {
      href: 'https://github.com/de44',
      text: 'de44 (github)'
    }
  }
};

const fields = [
  kb.field('', 'thumbnail').raw(false).label('No text').url('profile.website.href').src('profile.avatar.url'),
  kb.field('', 'thumbnail').label('With Description').url('profile.website.href').src('profile.avatar.url').description('title'),
  kb.field('', 'thumbnail').label('With Header').url('profile.website.href').src('profile.avatar.url').header('name'),
  kb.field('', 'thumbnail').label('With Everything').url('profile.website.href').src('profile.avatar.url').header('name').description('title')
];`

const codeStyle = {
  width: "600px",
  padding: "10px",
  backgroundColor: "#CCC",
  overflow: "scroll",
}

const CustomFieldDemo = ({ }) => {
  return (
    <div className="FieldsDemo">
      <FieldsDemo fields={fields} model={model} fieldsDef={fieldsDef} />
    </div>
  );
}

export default CustomFieldDemo
