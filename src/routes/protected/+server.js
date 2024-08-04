// @ts-nocheck
// @ts-ignore
export const GET = async ({ locals }) => {
    if (!locals.user) {
      return {
        status: 401,
        body: { error: 'Unauthorized' }
      };
    }
  
    return {
      status: 200,
      body: { message: 'Welcome to the protected route!' }
    };
  };
  