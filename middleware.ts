import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
const isSignInPage = createRouteMatcher(["/signin", "/signup"]);
const isProtectedRoute = createRouteMatcher(["/main"]);
const isLandingPage = createRouteMatcher(["/"]);

export default convexAuthNextjsMiddleware((request) => {
  if (isSignInPage(request) && isAuthenticatedNextjs())
    return nextjsMiddlewareRedirect(request, "/main");
  if (isProtectedRoute(request) || request.nextUrl.pathname.includes("main")) {
    if (!isAuthenticatedNextjs()) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }
  }

  if (isLandingPage(request)) {
    if (!isAuthenticatedNextjs()) {
      return nextjsMiddlewareRedirect(request, "/signin");
    } else return nextjsMiddlewareRedirect(request, "/main");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
