import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Kolom Pertama: Tentang */}
        <div>
          <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
          <p className="text-sm text-blue-200">
            Movie Library adalah platform pencarian dan informasi film terlengkap. 
            Temukan film favorit Anda dan jelajahi dunia perfilman.
          </p>
        </div>

        {/* Kolom Kedua: Link Cepat */}
        <div>
          <h3 className="text-xl font-bold mb-4">Link Cepat</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="hover:text-blue-300 transition duration-300"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link 
                to="/genres" 
                className="hover:text-blue-300 transition duration-300"
              >
                Genre Film
              </Link>
            </li>
            <li>
              <Link 
                to="/popular" 
                className="hover:text-blue-300 transition duration-300"
              >
                Film Populer
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom Ketiga: Kontak */}
        <div>
          <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
          <div className="space-y-2">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +62 123 4567 890
            </p>
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@movielibrary.com
            </p>
          </div>
        </div>
      </div>

      {/* Hak Cipta */}
      <div className="text-center mt-8 pt-4 border-t border-blue-700">
        <p className="text-sm text-blue-200">
          © {new Date().getFullYear()} Movie Library. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;