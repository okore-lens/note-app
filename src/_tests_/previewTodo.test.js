import React from "react";
import renderer from "react-test-renderer";
import PreviewTodoScreen from "../screens/app/PreviewTodoScreen";

test("renders correctly", () => {
	const tree = renderer.create(<PreviewTodoScreen />).toJSON();
	expect(tree).toMatchSnapshot();
});
