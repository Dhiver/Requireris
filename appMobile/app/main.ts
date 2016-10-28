import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { setStatusBarDarkerColor } from "./utils/status-bar-util";
import {registerElement} from "nativescript-angular/element-registry";

setStatusBarDarkerColor("#00897B");
platformNativeScriptDynamic().bootstrapModule(AppModule);
