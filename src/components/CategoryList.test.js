import React from 'react';
import { shallow } from 'enzyme';

import { CategoryList } from './CategoryList';
import Category from './Category';


describe('CategoryList component', () => {
  let wrapper;
  let categories;
  let props;

  beforeEach(() => {
    categories = [{ name: 'category-1', path: 'path_1'},
                  { name: 'category-2', path: 'path_2'}];

    props = {
      categories: categories,
    }

  });

  afterEach(() => {
    categories = [];
  })

  it('renders 1 category (ALL) when there are no categories', () => {
    props.categories = [];
    wrapper = shallow(<CategoryList {...props} />)
    expect(wrapper.find(Category)).toHaveLength(1);
  });

  it('renders a category component per each category in the ctaegories prop + ALL', () => {
    wrapper = shallow(<CategoryList {...props} />)
    expect(wrapper.find(".list-group")).toHaveLength(1);
    expect(wrapper.find(Category)).toHaveLength(3);
  });
});

