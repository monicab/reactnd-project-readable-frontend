import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';


import Category from './Category';


describe('Category component', () => {
  let wrapper;
  let category;
  let props;

  beforeEach(() => {
    category = { name: 'category-1', path: 'path_1'};
    props = {
      category: category,
    }

  });

  afterEach(() => {
    category = {};
  })

  it('renders a category', () => {
    const options = new ReactRouterEnzymeContext();
    wrapper = mount(<Category {...props} />, options.get())

    expect(wrapper.find(".list-group-item")).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);

    expect(wrapper.find(Link).props().to).toEqual("/path_1")
    expect(wrapper.find(Link).render().text()).toEqual("category-1")
  });

  it('renders a link with the category props data', () => {
    const options = new ReactRouterEnzymeContext();
    wrapper = mount(<Category {...props} />, options.get());

    expect(wrapper.find(Link).props().to).toEqual("/path_1");
    expect(wrapper.find(Link).render().text()).toEqual("category-1");
  })
});

