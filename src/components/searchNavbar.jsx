import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate au lieu de useHistory

const SearchNavbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Utilisez useNavigate

    const handleSearch = () => {
        // Utilisez navigate au lieu de history.push
        navigate(`/search?q=${query}`);
    };
    const verifEntrer = (touche) => {
        console.log('test1');
        if (touche.key === 'Enter'){
            console.log('test');
            handleSearch()
        }
    }
    return (
        <div className="inputNav">
            <input type="text" placeholder="Search Movie"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={verifEntrer}
            />
            <div className="buttonSearch" onClick={handleSearch}>
                <img src="/src/assets/img/loupe.png" alt="loupe" height={30} />
            </div>
        </div>
    );
};

export default SearchNavbar;
