import React, {Suspense} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import { useSelector } from "react-redux";
import { adminRoutes, clientRoutes } from "../routes";

const AppContent = () => {
  const user = useSelector((state) => state.user);
  const routes = user?.role === "admin" ? adminRoutes : clientRoutes;
  const defaultRedirect = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to={defaultRedirect} replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};




export default React.memo(AppContent);
