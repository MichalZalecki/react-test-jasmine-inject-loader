import React from "react";
import TestUtils, {Simulate} from "react-addons-test-utils";
import {TodoItem} from "./todos/TodoItem";
import AppInjector from "inject!./App";

describe("App component", () => {

  describe("full render", () => {

    it("should add todo", () => {
      const App = AppInjector({
        "uuid": { v4() { return "todo1"; } }
      }).App;

      const AppComponent = TestUtils.renderIntoDocument(<App />);
      const todoText = TestUtils.findRenderedDOMComponentWithClass(AppComponent, "todoText");
      const todoForm = TestUtils.findRenderedDOMComponentWithClass(AppComponent, "todoForm");
      const todoList = TestUtils.findRenderedDOMComponentWithClass(AppComponent, "todoList");

      todoText.value = "Super todo!";
      Simulate.change(todoText);
      Simulate.submit(todoForm);

      const todos = TestUtils.scryRenderedComponentsWithType(AppComponent, TodoItem);

      expect(todoList.textContent).toContain("Id: todo1");
      expect(todoList.textContent).toContain("Super todo!");
      expect(todos.length).toEqual(1);
    });

  });

});
