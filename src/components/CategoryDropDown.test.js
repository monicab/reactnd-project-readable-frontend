import React from 'react';
import { shallow } from 'enzyme';


import { CategoryDropDown } from './CategoryDropDown';


describe('Category drop-down component', () => {
  let wrapper;
  let categories;
  let props;
  let onChangeFn;

  beforeEach(() => {
    categories = [{ name: 'category-1', path: 'path_1'},
                  { name: 'category-2', path: 'path_2'},
                  { name: 'category-3', path: 'path_3'}];

    onChangeFn = jest.fn();

    props = {
      categories: categories,
      onChange: onChangeFn,
      value: '',
    };
  });

  afterEach(() => {
    categories = [];
  })

  it('renders a dropdown with all categories', () => {
    wrapper = shallow(<CategoryDropDown {...props} />)
    expect(wrapper.find(".form-group")).toHaveLength(1);
  });

  describe('options available', () => {
    it('render a please select element', () => {
      wrapper = shallow(<CategoryDropDown {...props} />)
      expect(wrapper.find("select")).toHaveLength(1);

      expect(wrapper.find("option[value='']")).toHaveLength(1);
      expect(wrapper.find("option[value='']").text()).toEqual(" -- Please select -- ");
    });

    it('render a select element with all categories + select', () => {
      wrapper = shallow(<CategoryDropDown {...props} />)
      expect(wrapper.find("select")).toHaveLength(1);

      expect(wrapper.find("option")).toHaveLength(props.categories.length + 1);
    });
  });

  describe('initial selected value', () => {
    it('when no default value is passed', () => {
      props.value = '';

      wrapper = shallow(<CategoryDropDown {...props} />)
      expect(wrapper.find("select[value='']")).toHaveLength(1);
    });

    it('when a value is passed in, the drop down selected value should be set to the value passed', () => {
      props.value = 'category-2';

      wrapper = shallow(<CategoryDropDown {...props} />)
      expect(wrapper.find("select[value='category-2']")).toHaveLength(1);
    });
  });

  describe('when user selected a different option', () => {
    it('should call the onChange fn when a element is selected', () => {
      wrapper = shallow(<CategoryDropDown {...props} />);
      wrapper.find('select').simulate('change', {target: { value : 'category-2'}});
      expect(onChangeFn.mock.calls.length).toBe(1);
    })

    it('should change the state value', () => {
      wrapper = shallow(<CategoryDropDown {...props} />);
      wrapper.find('select').simulate('change', {target: { value : 'category-2'}});
      expect(wrapper.state('value')).toEqual('category-2');
    })
  });
});

