import React from 'react';
import { FaHandsHelping, FaBookOpen, FaBullhorn } from 'react-icons/fa';

const CallToActionCard = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          Join the Movement for Change
        </h2>
        <p style={styles.paragraph}>
          Addressing SDG 1 and SDG 4 in the world's most vulnerable nations is not just a goal—it's an imperative. In regions plagued by conflict and disaster, the path to education and poverty alleviation is fraught with challenges. As current and future policymakers, it's our duty to navigate these complexities and forge inclusive solutions.
        </p>
        <div style={styles.actions}>
          <div style={styles.actionItem}>
            <FaHandsHelping style={styles.icon} />
            <span>Support initiatives bringing education to conflict zones.</span>
          </div>
          <div style={styles.actionItem}>
            <FaBookOpen style={styles.icon} />
            <span>Collaborate with organizations focused on poverty reduction.</span>
          </div>
          <div style={styles.actionItem}>
            <FaBullhorn style={styles.icon} />
            <span>Advocate for policies that prioritize the needs of LDCs.</span>
          </div>
        </div>
        <button class="back-button">
          Take Action Now
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: '#f9f9f9',
    padding: '60px 20px',
    textAlign: 'center',
    width: '80%'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  paragraph: {
    marginBottom: '40px',
    color: '#555',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center',
    color: '#444',
  },
  icon: {
    
    marginRight: '10px',
    color: '#1d3557',
  },
  button: {
    backgroundColor: '#1d3557',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default CallToActionCard;
