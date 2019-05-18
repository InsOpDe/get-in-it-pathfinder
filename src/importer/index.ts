import {
	IImportGraph,
	IImportGraphNode,
	TGraphNodeMap,
	IImportGraphEdge,
	IGraph,
	TGraphLabelMap
} from "../internal";
/**
 * Converts imported JSON to a more useful format
 */
export const convert = (graph: IImportGraph): IGraph => {
	const [nodes, labelMap] = createNodeMap(graph.nodes);
	passEdgesToNodes(graph.edges, nodes);
	return { nodes, labelMap };
};
/**
 * Creates NodeMap from imported JSON
 */
const createNodeMap = (
	nodes: IImportGraphNode[]
): [TGraphNodeMap, TGraphLabelMap] => {
	const sanitizedNodes: TGraphNodeMap = new Map();
	const labelNodeMap: TGraphLabelMap = new Map();
	for (const id in nodes) {
		const node = nodes[id];
		const label = node.label.toLowerCase();
		sanitizedNodes.set(id, {
			edges: new Map(),
			id,
			label
		});
		labelNodeMap.set(label, id);
	}
	return [sanitizedNodes, labelNodeMap];
};
/**
 * Mutates node-map due passing edges from imported JSON.
 */
const passEdgesToNodes = (
	edges: IImportGraphEdge[],
	nodes: TGraphNodeMap
): void => {
	for (const edge of edges) {
		const { cost, source: sourceId, target: targetId } = edge;
		/* Graph is undirected, that means we can give costs in both directions */
		const sourceNode = nodes.get(String(sourceId));
		const targetNode = nodes.get(String(targetId));
		sourceNode.edges.set(targetNode.id, cost);
		targetNode.edges.set(sourceNode.id, cost);
	}
};
