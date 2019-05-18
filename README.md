## Pathfinder
Finds shortest path in graph with one of these algorithms:
* Dijkstra
* Floyd Warshall
* Bellman Ford
It also has an easy to use cli.

### Competition
This code is my entry for the [Get-in-IT](https://www.get-in-it.de/coding-challenge) competition

#### Install
`npm i` or `yarn install`

#### Build and Start
`npm run build` or `npm run buildAndStart`

#### CLI
Use it like this
`node dist/app.js --file data/generatedGraph.json --start Erde --end b3-r7-r4nd7 -a 0`

where **`--file`** or **`-f`**  determines the the `JSON` to be used and has to be of following structure:
```JSON
{
	"nodes": [
		{
			"label": "foo"
		},
		{
			"label": "bar"
		},
		{
			"label": "baz"
		}
	],
	"edges": [
		{
			"source": 0,
			"target": 1,
			"cost": 1
		},
		{
			"source": 1,
			"target": 2,
			"cost": 1
		}
	]
}
```
`source` and `target` reference the index in `nodes`


**`--start`** or **`-s`** and **`--end`** or **`-e`** determine the label of the start and end node


**`--algorithm`** or **`-a`** determines the algorithm and has following options:
* 0 is Bellman Ford
* 1 is Dijkstra
* 2 is Floyd Warshall

#### Run with Docker
Be sure to copy your `graph.json` into the data folder, before building the image. Otherwise you have to mount the folder with `-v` in order to access the data.

Building the image: `docker build -t pathfinder .`

Running the image: `docker run -i pathfinder`

#### Tests
In order to test everything one may run `num run test:textcoverage`
