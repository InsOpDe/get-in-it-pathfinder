import {bellmanFord, dijkstra, ESolver, floydWarshall, IProblem, ISolution} from "../internal";
export const solve = (problem: IProblem): ISolution => {
	switch (problem.solver) {
		case ESolver.dijkstra:
			return dijkstra(problem);
		case ESolver.floydWarshall:
			return floydWarshall(problem);
		case ESolver.bellmanFord:
		default:
			return bellmanFord(problem);
	}
};
