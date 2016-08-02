import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import selectize from 'selectize';

import './main.html';
import 'selectize/dist/css/selectize.css';

const selectLinks = [
  { id: 1, title: 'DIY', url: 'https://diy.org' },
  { id: 2, title: 'Google', url: 'http://google.com' },
  { id: 3, title: 'Yahoo', url: 'http://yahoo.com' },
];

const getLinkTitle = (id) => {
  let title;
  if (id) {
    const selectedLink = _.find(selectLinks, (link) => {
      return link.id === parseInt(id);
    });
    if (selectedLink) {
      title = selectedLink.title;
    }
  }
  return title;
};

Template.body.onRendered(function onRendered() {
  $('#select-links').selectize({
    maxItems: null,
    valueField: 'id',
    searchField: 'title',
    options: selectLinks,
    render: {
      option: function(data, escape) {
        return '<div class="option">' +
            '<span class="title">' + escape(data.title) + '</span>' +
            '<span class="url">' + escape(data.url) + '</span>' +
          '</div>';
      },
      item: function(data, escape) {
        return '<div class="item"><a href="' + escape(data.url) + '">' + escape(data.title) + '</a></div>';
      }
    },
    create: function(input) {
      return {
        id: 0,
        title: input,
        url: '#'
      };
    },
    onChange: function (values) {
      if (values) {
        values.forEach((value) => {
          // Can save to your colletion/database here ...
          console.log({
            id: value,
            text: getLinkTitle(value)
          });
        });
      }
    }
  });
});
