import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  // Inject Router using Angular's DI

  // Get the userInfo from localStorage (or sessionStorage)
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  
  // If userInfo is available and we have the navigation data
  if (userInfo && userInfo.navigations) {
    // Get the requested URL
    const requestedUrl = state.url;

    // Check if the requested URL matches any of the navigations assigned to the user
    const isAllowed = userInfo.navigations.some((nav: { navigation: { nav_url: string } }) => nav.navigation.nav_url === requestedUrl);

    // If the user is allowed to access this URL, allow the route
    if (isAllowed || requestedUrl === "/landing/user/menu") {
      return true;
    }
  }

  if (userInfo && state.url === '/login') {
    return router.createUrlTree(['/landing']); // Redirect to the landing page or home page
  }

  // If the user doesn't have access to the route, return a redirection URL
  return router.createUrlTree(['/landing/user/menu']);
};
