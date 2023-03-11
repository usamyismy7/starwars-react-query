import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
// import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(1);
    // const { data, status } = useQuery(['planets', page], fetchPlanets, {
    //     staleTime: 2000,
    //     //cacheTime: 10,
    // });
    const { resolvedData,
        latestData,
        status } = usePaginatedQuery(['planets', page], fetchPlanets);

    return (
        <div>
            <h2>Planets</h2>
            {status === 'loading' && (
                <div>Loading data...</div>
            )}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            {status === 'success' && (
                <>
                    {/* <div>By using useQuery:</div>
                    <button onClick={() => setPage(1)}>page 1</button>
                    <button onClick={() => setPage(2)}>page 2</button>
                    <button onClick={() => setPage(3)}>page 3</button>
                    <div>
                        {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                    </div>
                    <div>By using usePaginatedQuery:</div> */}
                    <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>Previous Page</button>
                    <span>{page}</span>
                    <button onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))} disabled={!latestData || !latestData.next}>Next Page</button>
                    <div>
                        {resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                    </div>
                </>
            )}
        </div>
    )
}

export default Planets