import {createRootRoute, Link, Outlet} from '@tanstack/react-router';

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="nav">
                <h1>
                    <Link to="/">App</Link>
                </h1>
                <nav>
                    <Link to="/" className="link">
                        Home
                    </Link>{' '}
                    <Link to="/login" className="link">
                        Login
                    </Link>{' '}
                    <Link to="/register" className="link">
                        Register
                    </Link>
                </nav>
            </div>
            <Outlet/>
        </>
    ),
});