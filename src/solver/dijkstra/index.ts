import {
	IProblem, ISolution,
	TGraphEdgeMap, TGraphId, TGraphNodeMap
} from "../../internal";
type TNodeIdMap = Map<TGraphId, TGraphId>;
export const dijkstra = (problem: IProblem): ISolution => {
	const lowestCostNodes = getInitialLowestCosts(problem);
	const bestPreviousNodes = getInitialBestPreviousNodes(problem);
	processEdges(problem.graph.nodes, lowestCostNodes, bestPreviousNodes);
	const bestPath = getBestPath(problem.start, problem.finish, bestPreviousNodes);
	return {
		cost: lowestCostNodes.get(problem.finish),
		path: bestPath
	}
};
const getBestPath = (startId: TGraphId, finishId: TGraphId, bestPreviousNodes: TNodeIdMap) => {
	const bestPathReverse = [finishId];
	let previousNodeId = bestPreviousNodes.get(finishId);
	// TODO: kein Weg zum Ziel!
	while (previousNodeId !== startId) {
		bestPathReverse.push(previousNodeId);
		previousNodeId = bestPreviousNodes.get(previousNodeId)
	}
	bestPathReverse.push(startId);
	return bestPathReverse.reverse();
};
/**
 * Calculates cheapest ways to each node and stores its previous nodes
 */
const processEdges = (nodes: TGraphNodeMap, lowestCostNodes: TGraphEdgeMap, bestPreviousNodes: TNodeIdMap) => {
	const processedNodeIds: TGraphId[] = [];
	let lowestCostNodeId = getLowestCostNodeId(lowestCostNodes, processedNodeIds);
	/* Runs until getLowestCostNode returns null */
	while(lowestCostNodeId) {
		let cost = lowestCostNodes.get(lowestCostNodeId);
		const {
			edges
		} = nodes.get(lowestCostNodeId);
		for(const [
			nodeId,
			edgeCost
		] of edges) {
			const newCost = cost + edgeCost;
			if (!lowestCostNodes.get(nodeId)) {
				lowestCostNodes.set(nodeId, newCost);
				bestPreviousNodes.set(nodeId, lowestCostNodeId);
			}
			if (lowestCostNodes.get(nodeId) > newCost) {
				lowestCostNodes.set(nodeId, newCost);
				bestPreviousNodes.set(nodeId, lowestCostNodeId);
			}
		}
		processedNodeIds.push(lowestCostNodeId);
		lowestCostNodeId = getLowestCostNodeId(lowestCostNodes, processedNodeIds);
	}
};
const getInitialBestPreviousNodes = (problem: IProblem): TNodeIdMap => {
	const bestPreviousNodes: TNodeIdMap = new Map();
	bestPreviousNodes.set(problem.finish, null);
	for(const [nodeId, edgeCost] of problem.graph.nodes.get(problem.start).edges) {
		bestPreviousNodes.set(nodeId, problem.start);
	}
	return bestPreviousNodes;
};
const getLowestCostNodeId = (lowestCostNodes: TGraphEdgeMap, processedNodeIds: TGraphId[]) => {
	return Array.from(lowestCostNodes).reduce((lowestCostNodeId: TGraphId, [
		nodeId,
		cost
	]: [TGraphId, number]) => {
		if(lowestCostNodeId === null || cost < lowestCostNodes.get(lowestCostNodeId)) {
			if(!processedNodeIds.includes(nodeId)) {
				lowestCostNodeId = nodeId
			}
		}
		return lowestCostNodeId;
	}, null);
};
const getInitialLowestCosts = (problem: IProblem): TGraphEdgeMap => {
	const nodes = problem.graph.nodes;
	const lowestCosts: TGraphEdgeMap = new Map();
	lowestCosts.set(problem.finish, Infinity);
	for(const [id, cost] of nodes.get(problem.start).edges) {
		lowestCosts.set(id, cost)
	}
	return lowestCosts;
};
