require = require('esm')(module);
import { shallowMount } from '@vue/test-utils';
import PersonalInformation from '../components/PersonalInformation.vue';
import Vuex from 'vuex';


describe('PersonalInformation', () => {
  let wrapper;
  const guest = {
    firstName: "firstName",
    lastName: "lastName",
    address: "address",
    city: "city",
    state: "state",
    zipCode: "zipCode",
    phone: "phone",
    email: "email",
  }

  const actions = {
    setEmail: jest.fn()
  }
  const $store = new Vuex.Store({
    actions
  })


  beforeEach(() => {
    wrapper = shallowMount(PersonalInformation, {
      propsData: {
        guest
      },
      global: {
        mocks: {
          $store
        }
      }
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('sets the formValid to be false by default', async () => {
    // Trigger form validation
    await wrapper.vm.validateForm();
    expect(wrapper.vm.formValid).toBe(false);
  });

  it('sets the formValid to be false when a field is empty', async () => {
    // Modify the form fields
    wrapper.setData({
      firstName: '',
    });

    await wrapper.vm.validateForm();

    expect(wrapper.vm.formValid).toBe(false);
  });

  it('emits "getPersonalInfo" event on form submission', async () => {
    const email = 'john.doe@example.com';
    wrapper.setData({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Street',
      city: 'Example City',
      state: 'CA',
      zipCode: '12345',
      phone: '1234567890',
      email,
    });

    // Trigger form submission
    await wrapper.vm.confirmPersonalInfo();

    // Check that the store action was called
    // Check if the "getPersonalInfo" event was emitted with the correct payload
    expect(actions.setEmail.mock.calls).toHaveLength(1);
    expect(actions.setEmail.mock.calls[0][1]).toEqual(email);
    expect(wrapper.emitted('getPersonalInfo')[0][0]).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Street',
      city: 'Example City',
      state: 'CA',
      zipCode: '12345',
      phone: '1234567890',
      email,
    });
  });

  it('emits "getPersonalInfo" event with empty object when a field is empty', async () => {
    const email = 'john.doe@example.com';
    wrapper.setData({
      firstName: 'John',
      lastName: '',
      address: '123 Street',
      city: 'Example City',
      state: 'CA',
      zipCode: '12345',
      phone: '1234567890',
      email,
    });

    // Trigger form submission
    await wrapper.vm.confirmPersonalInfo();

    // Check that the store action was called
    // Check if the "getPersonalInfo" event was emitted with the correct payload
    expect(actions.setEmail.mock.calls).toHaveLength(2);
    expect(actions.setEmail.mock.calls[1][1]).toEqual(email);
    expect(wrapper.emitted('getPersonalInfo')[0][0]).toEqual({});
  });
});





