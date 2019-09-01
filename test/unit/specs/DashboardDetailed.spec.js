// eslint-disable-next-line import/extensions,import/no-unresolved
import { shallowMount } from '@vue/test-utils';
import DashboardDetailed from '@/components/DashboardDetailed';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(DashboardDetailed, {
    propsData: {
      lat: 1,
      lon: 1,
    },
    mocks: {},
    stubs: {},
    methods: {},
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('DashboardDetailed', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
