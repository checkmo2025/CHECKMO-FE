import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

/** 정상 라우트 방문 시 마지막 유효 경로 기록 */
export const RouteTracker = () => {
    const loc = useLocation();
    useEffect(() => {
        const full = loc.pathname + loc.search + loc.hash;
        sessionStorage.setItem("lastGoodPath", full);
    }, [loc.pathname, loc.search, loc.hash]);
    return <Outlet />;
};

/** 잘못된 경로 → 마지막 유효 경로로 되돌리고 강제 새로고침 */
export const NotFoundRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const last = sessionStorage.getItem("lastGoodPath") || "/";
        if (window.location.pathname !== last) {
            navigate(last, { replace: true });
            setTimeout(() => window.location.reload(), 0);
        } else {
            window.location.reload();
        }
    }, [navigate]);
    return null;
};