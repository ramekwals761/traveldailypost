import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Events | Kordinate News',
  description: 'Latest travel industry events, conferences, and expo coverage from around the world.',
};

export default function Events() {
  return (
    <main className="content-main">
      <div className="container">
        <article className="page-content">
          <div className="page-header">
            <h1>Travel Events</h1>
            <p className="lead">Coverage of major travel industry events and conferences</p>
          </div>

          <section className="content-section">
            <h2>Upcoming Events</h2>
            <p>
              Stay informed about major travel industry events, conferences, trade shows, and expo coverage. Kordinate News brings you the latest developments and announcements from events around the world.
            </p>
          </section>

          <section className="content-section">
            <h2>Event Categories</h2>
            <ul className="content-list">
              <li>International Travel Trade Fairs</li>
              <li>Airline Industry Conferences</li>
              <li>Hotel & Accommodation Summits</li>
              <li>Tourism Board Announcements</li>
              <li>Cruise & Maritime Events</li>
              <li>Travel Technology Exhibitions</li>
              <li>Destination Marketing Events</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Major Events We Cover</h2>
            <ul className="content-list">
              <li>ITB Berlin - International Travel Trade Show</li>
              <li>WTM London - World Travel Market</li>
              <li>IATA Annual General Meeting</li>
              <li>UNWTO World Tourism Conference</li>
              <li>USTOA Travel Convention</li>
              <li>C3 Expo - Cruise Conference & Expo</li>
              <li>PhoCusWright Travel Technology Conference</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Submit an Event</h2>
            <p>
              Have a travel event you'd like us to cover? Contact our events team at:
              <br/><a href="mailto:contact@kordinate.world">contact@kordinate.world</a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
