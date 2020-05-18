import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStatistics} from "../../store/actions/statisticsActions";
import {getProductsList} from "../../store/actions/productsActions";

const Statistics = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics.statistics);
    console.log(statistics);

    useEffect(() => {
        dispatch(getProductsList());
    }, [dispatch]);

    const clickHandler = () => {
       dispatch(getStatistics('5ec24b5c3c7485425bc5b8c1', '5'));
    };

    return (
        <div>
            <button onClick={clickHandler}>Поиск</button>
        </div>
    );
};

export default Statistics;