export function middleware(request) {
  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  
  if (maintenanceMode) {
    // Get the URL of the maintenance page
    const url = new URL('/maintenance.html', request.url);
    
    // Redirect to the maintenance page
    return Response.redirect(url);
  }
}

// Configure which paths the middleware runs on (runs on all paths except those specified)
export const config = {
  matcher: '/((?!maintenance.html|_next/static|_next/image|favicon.ico).*)',
};
