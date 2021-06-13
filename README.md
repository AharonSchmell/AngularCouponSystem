
This is an Angular SPA written in TypeScript, CSS and HTML using Bootstrap. The application is divided into three layers:
The first layer is the storage service where all the requests to the backend go through.
Next is the services which are a go between the storage service and the components.
Finally we have the components themselves that actually show the data.
In our case there are three different types of users: ADMIN, COMPANY and CUSTOMER.
The ADMIN is like the queen on a chess board, he can to all the operations that can be doen by the COMPANY and CUSTOMER and more.
A COMPANY can update its own fields and more importantly- create update and delete coupons.
A CUSTOMER can also update his own fields and buy or cancle a purchase of said coupons.
The routing is done via the app-routing.module.ts.
 In order to write less components, the ADMIN paths are a duplicate of the COMPANY and CUSTOMER paths with the sole difference of having those paths being child components of the ADMIN.  
