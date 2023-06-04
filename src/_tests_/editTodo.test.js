import React from "react";
import renderer from "react-test-renderer";
import EditTodoScreen from "../screens/app/EditTodoScreen";

test("renders correctly", () => {
	const tree = renderer.create(<EditTodoScreen />).toJSON();
	expect(tree).toMatchSnapshot();
});
