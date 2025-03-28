import { getPeopleByID } from '../src/Services/PeopleServices';
import axios from 'axios';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('axios');

describe('getPeopleByID', () => {
  const mockPerson = {
    id: 123,
    name: 'Test Person',
    birthday: '1990-01-01',
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  it('should fetch person details with correct URL and headers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPerson });

    const id = 123;
    await getPeopleByID(id);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/person/123?language=fr-FR',
      expect.objectContaining({
        headers: {
          Authorization: expect.stringContaining('Bearer'),
        },
      })
    );
  });

  it('should return person data on successful request', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPerson });

    const response = await getPeopleByID(123);
    expect(response.data).toEqual(mockPerson);
  });

  it('should throw error on failed request', async () => {
    const error = new Error('Network error');
    axios.get.mockRejectedValueOnce(error);

    await expect(getPeopleByID(123)).rejects.toThrow('Network error');
  });
});
