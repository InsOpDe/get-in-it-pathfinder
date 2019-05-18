import { IGraphNode, IProblem, ISolution, TNodeId } from "../../internal";
type TDistanceMap = Map<TNodeId, number>;
type TNodeMap = Map<TNodeId, TNodeId>;
interface IEdge {
	from: TNodeId;
	to: TNodeId;
	cost: number;
}
export const bellmanFord = (problem: IProblem): ISolution => {
	const { graph, start, finish } = problem;
	const edges = getEdges(graph.nodes);
	const distances: TDistanceMap = new Map();
	const previousNodes: TNodeMap = new Map();
	for (const [nodeId] of graph.nodes) {
		distances.set(nodeId, Infinity);
		previousNodes.set(nodeId, null);
	}
	distances.set(start, 0);
	const graphSize = graph.nodes.size;
	for (let i = 0; i < graphSize - 1; i++) {
		for (const edge of edges) {
			if (distances.get(edge.from) + edge.cost < distances.get(edge.to)) {
				distances.set(edge.to, distances.get(edge.from) + edge.cost);
				previousNodes.set(edge.to, edge.from);
			}
		}
	}
	return {
		path: getPath(previousNodes, start, finish),
		cost: distances.get(finish)
	};
};
const getPath = (
	previousNodes: TNodeMap,
	start: TNodeId,
	finish: TNodeId
): TNodeId[] => {
	let currentNode = finish;
	const path: TNodeId[] = [];
	while (currentNode !== null) {
		path.push(currentNode);
		currentNode = previousNodes.get(currentNode);
	}
	/* If path length equals 1 it means that no path is found */
	return path.length === 1 ? [] : path.reverse();
};
const getEdges = (nodes: Map<TNodeId, IGraphNode>): IEdge[] => {
	const edges: IEdge[] = [];
	for (const [from, node] of nodes) {
		for (const [to, cost] of node.edges) {
			edges.push({
				from,
				to,
				cost
			});
		}
	}
	return edges;
};
