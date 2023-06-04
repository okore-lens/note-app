import React from "react";
import renderer from "react-test-renderer";
import CreateTodoScreen from "../screens/app/CreateTodoScreen";

test("renders correctly", () => {
	const tree = renderer.create(<CreateTodoScreen />).toJSON();
	expect(tree).toMatchSnapshot();
});
