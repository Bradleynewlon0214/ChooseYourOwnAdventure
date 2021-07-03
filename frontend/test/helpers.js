import sinon from 'sinon';
import { expect } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

global.expect = expect;
global.sinon = sinon; 

global.mount = mount;
global.render = render;
global.shallow = shallow;