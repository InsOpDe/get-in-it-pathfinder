import { IGraph, IProblem, ISolution, TNodeId } from "../../internal";
type TDistanceMatrix = Map<TNodeId, Map<TNodeId, number>>;
type TNodePath = Map<TNodeId, Map<TNodeId, TNodeId>>;
export const floydWarshall = (problem: IProblem): ISolution => {
	const { graph, start, finish } = problem;
	const [distanceMatrix, nodePath] = createDistanceMatrix(graph);
	const nodeIds = Array.from(distanceMatrix.keys());
	for (const k of nodeIds) {
		for (const i of nodeIds) {
			for (const j of nodeIds) {
				const distanceIJ = distanceMatrix.get(i).get(j);
				const distanceIK = distanceMatrix.get(i).get(k);
				const distanceKJ = distanceMatrix.get(k).get(j);
				if (distanceIJ > distanceIK + distanceKJ) {
					distanceMatrix.get(i).set(j, distanceIK + distanceKJ);
					nodePath.get(i).set(j, nodePath.get(i).get(k));
				}
			}
		}
	}
	return {
		cost: distanceMatrix.get(start).get(finish),
		path: getPathTo(nodePath, start, finish)
	};
};
const getPathTo = (
	nodePath: TNodePath,
	start: TNodeId,
	finish: TNodeId
): TNodeId[] => {
	if (nodePath.get(start).get(finish) === null) {
		return [];
	}
	const path = [start];
	let current = start;
	while (current !== finish) {
		if (nodePath.get(current)) {
			current = nodePath.get(current).get(finish);
			path.push(current);
		} else {
			/* If nodePath is null, this means that there is no path to target */
			return [];
		}
	}
	return path;
};
const createDistanceMatrix = (graph: IGraph): [TDistanceMatrix, TNodePath] => {
	const distanceMatrix: TDistanceMatrix = new Map();
	const nodePath: TNodePath = new Map();
	const { nodes } = graph;
	const nodeIds = Array.from(nodes.keys());
	for (const i of nodeIds) {
		distanceMatrix.set(i, new Map());
		nodePath.set(i, new Map());
		for (const j of nodeIds) {
			const distanceIJ = nodes.get(i).edges.get(j);
			if (i === j) {
				distanceMatrix.get(i).set(j, 0);
				nodePath.get(i).set(j, j);
			} else if (!isFinite(distanceIJ)) {
				distanceMatrix.get(i).set(j, Infinity);
			} else {
				distanceMatrix.get(i).set(j, distanceIJ);
				nodePath.get(i).set(j, j);
			}
		}
	}
	return [distanceMatrix, nodePath];
};
