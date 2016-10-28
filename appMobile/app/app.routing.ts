import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { AddComponent } from "./pages/add/add.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  AddComponent
];
