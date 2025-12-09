'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/Hero.css';

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      router.push(`/nummer/${phoneNumber.replace(/\s/g, '')}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Är numret säkert?</h1>
        <p>Sök bland över 50 000 rapporterade scamnummer och bedragare</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="tel"
            placeholder="Ange telefonnummer..."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit">Sök</button>
        </form>
      </div>
    </section>
  );
}
