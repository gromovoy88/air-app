// eslint-disable-next-line import/extensions,import/no-unresolved
import { shallowMount } from '@vue/test-utils';
import App from '@/App';

const wrapper = shallowMount(App);

afterEach(() => {
  wrapper.destroy();
});

describe('App', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
