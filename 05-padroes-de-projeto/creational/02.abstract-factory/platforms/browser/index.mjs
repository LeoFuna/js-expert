import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableBrowserComponent from "./table.mjs";

export default class BrowserViewFactory extends ViewFactory {
    createTable(data) {
        return new TableBrowserComponent(data);
    }
}