import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/signin", "/signup"]);
const isProtectedRoute = createRouteMatcher(["/main/*"]);
const isLandingPage = createRouteMatcher(["/"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  console.log(
    "convexAuth.isAuthenticated() >>>>>>>>>>>>>>> ",
    convexAuth.isAuthenticated()
  );
  console.log("isLandingPage(request) >>>>>>>>>>>> ", isLandingPage(request));
  if (isSignInPage(request) && convexAuth.isAuthenticated())
    return nextjsMiddlewareRedirect(request, "/main");
  if (isProtectedRoute(request) && !convexAuth.isAuthenticated())
    return nextjsMiddlewareRedirect(request, "/signin");
  if (isLandingPage(request)) {
    if (!convexAuth.isAuthenticated())
      return nextjsMiddlewareRedirect(request, "/signin");
    return nextjsMiddlewareRedirect(request, "/main");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
