import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableConsoleComponent from "./table.mjs";

export default class ConsoleFactory extends ViewFactory {
    createTable(data) {
        return new TableConsoleComponent(data);
    }
}