import React from 'react';
import AddStory, { LevelItem } from '../src/components/AddStory';

describe('Add Story', () => {
    it('renders new LevelItem', () => {
        const wrapper = mount(shallow(<AddStory />).get(0)); //for some reason clicks don't seem to work on just a shallow render
        wrapper.find("button").at(1).simulate('click');
        expect(wrapper.find(LevelItem)).to.have.length(1);
    });

    it('passes props to LevelItem', () => {
        const wrapper = mount(shallow(<AddStory />).get(0));
        wrapper.find("button").at(1).simulate('click');
        wrapper.find("button").at(1).simulate('click');
        const levelWrapper = wrapper.find(LevelItem).at(1);
        expect(levelWrapper.props().id).not.to.be.equal(null);        
        expect(levelWrapper.props().levels).to.have.length(2);
    });


    it('submits story', () => {
        const wrapper = shallow(<AddStory />);
        const instance = wrapper.dive().instance();
        expect(instance.postStory).not.to.be.equal(null);

        sinon.spy(instance, 'postStory');

    });
});