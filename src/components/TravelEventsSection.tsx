import Link from 'next/link';
import { travelEvents } from '@/lib/news-data';

export default function TravelEventsSection() {
  return (
    <section className="home-section home-section--alt" aria-labelledby="events-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="events-heading">Travel Events</h2>
          <Link href="/category/travel-events" className="section-view-all">
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="events-list">
          {travelEvents.map((event, idx) => {
            const [datePart] = event.date.split('–');
            const parts = datePart.trim().split(' ');
            const month = parts[0];
            const day = parts[1]?.replace(',', '') || '';

            return (
              <Link key={idx} href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
                <div className="event-item">
                  <div className="event-date-box">
                    <div className="event-date-day">{day}</div>
                    <div className="event-date-month">{month}</div>
                  </div>
                  <div>
                    <div className="event-info-name">{event.name}</div>
                    <div className="event-info-venue">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {event.venue} &nbsp;·&nbsp; {event.date}
                    </div>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: 'var(--color-gray-300)', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
