import { shallowMount } from '@vue/test-utils';
import BookingSummary from '@/components/BookingSummary.vue';

describe('BookingSummary', () => {
  describe('numberOfNights', () => {
    it('calculates the correct number of nights', () => {
      const checkInDate = '2023-06-01';
      const checkOutDate = '2023-06-05';

      const wrapper = shallowMount(BookingSummary);

      const numberOfNights = wrapper.vm.numberOfNights(checkInDate, checkOutDate);

      expect(numberOfNights).toBe(4);
    });
  });

  describe('calculateTotalPrice', () => {
    it('calculates the total price correctly', () => {
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

      const checkInDate = '2023-06-01';
      const checkOutDate = '2023-06-05';

      const wrapper = shallowMount(BookingSummary, {
        propsData: {
          rooms,
          checkInDate,
          checkOutDate
        }
      });

      const totalNights = wrapper.vm.numberOfNights(checkInDate, checkOutDate);
      const totalPrice = wrapper.vm.calculateTotalPrice();

      expect(totalPrice).toBe(900); // Assuming 4 nights, total price = (2 * $100 + 1 * $150) * 4 = $900
    });
  });
});
