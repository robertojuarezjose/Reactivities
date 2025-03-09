import {createBrowserRouter} from 'react-router';
import App from '../layouts/App';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetailPage from '../../features/activities/details/ActivityDetailPage';
import Counter from '../../features/counter/Counter';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {path: '', element: <HomePage/>},
            {path: 'activities', element: <ActivityDashboard/>},
            {path: 'createActivity', element: <ActivityForm key='create'/>},
            {path: 'manage/:id', element: <ActivityForm/>},
            {path: 'activities/:id', element: <ActivityDetailPage/>},
            {path: 'counter', element: <Counter/>}
        ]

    }
]);