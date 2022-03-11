import { Event, LoadEventsPort, EventService } from '../..';
import { instance, mock, when } from 'ts-mockito';

describe('EventService', () => {
  it('should return events on getEvents method calling', async () => {
    const loadEventsPort = mock<LoadEventsPort>();

    const mockedEvent = mock(Event);

    const eventInstance = instance(mockedEvent);
    when(loadEventsPort.loadEvents()).thenReturn(
      Promise.resolve([eventInstance]),
    );

    const eventService = new EventService(instance(loadEventsPort));

    expect(await eventService.getEvents()).toEqual([eventInstance]);
  });
});
