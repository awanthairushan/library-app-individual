import React from 'react';
import LibraryPage from './view/LibraryPage'
import './assets/scss/main.scss'
import {DataProvider} from "./contexts/DataContext";

function App() {
    return (
        <DataProvider>
            <LibraryPage/>
        </DataProvider>
    );
}

export default App;
