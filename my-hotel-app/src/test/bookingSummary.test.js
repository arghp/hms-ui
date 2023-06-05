require = require('esm')(module);
import { shallowMount } from '@vue/test-utils';
import BookingSummary from '../components/BookingSummary.vue';

describe('BookingSummary', () => {
  let wrapper;
  const rooms = {
        room1: {
          numRooms: 2,
          roomPrice: '$100'
        },
        room2: {
          numRooms: 1,
          roomPrice: '$150'
        }
  };
  const nGuests = 2;
  const checkInDate = '2023-06-01';
  const checkOutDate = '2023-06-05';
  const additionalOptions = 'Additional options';
  const guestRequests = false;

  beforeEach(() => {
    wrapper = shallowMount(BookingSummary, {
      propsData: {
        rooms,
        nGuests,
        checkInDate,
        checkOutDate,
        additionalOptions,
        guestRequests,
      },
    });
  });

  describe('numberOfNights', () => {

    it('calculates the correct number of nights when start date is before end date', () => {
      const startDate = '2023-06-01';
      const endDate = '2023-06-05';

      const wrapper = shallowMount(BookingSummary);

      const numberOfNights = wrapper.vm.numberOfNights(startDate, endDate);

      expect(numberOfNights).toBe(4);
    });

    it('returns 0 for the same start and end dates', () => {
      const startDate = '2023-06-01';
      const endDate = '2023-06-01';

      const wrapper = shallowMount(BookingSummary);

      expect(wrapper.vm.numberOfNights()).toBe(0);
    });

    it('returns invalid input msg when start date does not exit', () => {
      const startDate = null;
      const endDate = '2023-06-01';

      const wrapper = shallowMount(BookingSummary);

      const numberOfNights = wrapper.vm.numberOfNights(startDate, endDate);

      expect(numberOfNights).toBe('Invalid input');
    });

    it('returns invalid input msg when end date does not exit', () => {
      const startDate = '2023-06-01';
      const endDate = '';

      const wrapper = shallowMount(BookingSummary);

      const numberOfNights = wrapper.vm.numberOfNights(startDate, endDate);

      expect(numberOfNights).toBe('Invalid input');
    });

    it('returns invalid date range msg when end date is before start date', () => {
      const startDate = '2023-06-05';
      const endDate = '2023-06-01';

      const wrapper = shallowMount(BookingSummary);

      const numberOfNights = wrapper.vm.numberOfNights(startDate, endDate);

      expect(numberOfNights).toBe('Invalid date range');
    });
  });

  /*describe('calculateTotalPrice', () => {
    it('calculates the total price correctly', () => {
      const startDate = checkInDate;
      const endDate = checkOutDate;
      const totalNights = wrapper.vm.numberOfNights(startDate, endDate);
      const totalPrice = wrapper.vm.calculateTotalPrice(totalNights);

      expect(totalPrice).toBe(900); // Assuming 4 nights, total price = (2 * $100 + 1 * $150) * 4 = $900
    });
  });*/
});
