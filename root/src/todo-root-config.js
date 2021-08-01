import { registerApplication, start, getAppStatus } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();

// window.addEventListener('single-spa:before-routing-event', evt => {
//   const {
//     originalEvent,
//     newAppStatuses,
//     appsByNewStatus,
//     totalAppChanges,
//     oldUrl,
//     newUrl,
//     navigationIsCanceled,
//     cancelNavigation,
//   } = evt.detail;
//   console.log(
//     originalEvent,
//   );
//   console.log(
//     newAppStatuses,
//   );
//   console.log(
//     appsByNewStatus,
//   );
//   console.log(
//     totalAppChanges,
//   );
//   console.log(oldUrl);
//   console.log(newUrl);
//   console.log(navigationIsCanceled);
// });

// window.addEventListener('single-spa:before-app-change', evt => {
//   console.log(evt);
//   document.title = evt.detail.totalAppChanges
//   console.log('single-spa is about to mount/unmount applications!');
//   console.log(evt.detail.originalEvent);
//   console.log(evt.detail.newAppStatuses);
//   console.log(evt.detail.appsByNewStatus);
//   console.log(evt.detail.totalAppChanges);
// });
