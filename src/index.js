const github = require("parse-github-url");

function mdImage(name = "Badge", image, link) {
	if (link) {
		return `[![${name}](${image})](${link})`;
	} else {
		return `![${name}](${image})`;
	}
}

function mdImages(badges = []) {
	return badges.map(mdImage).join(" ");
}

const generators = {
	github: package => {
		const {repo} = github(package.repository.url);
		return mdImage(
			"GitHub release",
			`https://img.shields.io/github/release/${repo}.svg?style=popout&label=github`,
			`https://github.com/${repo}/releases/latest`,
		);
	},
	npm: package => {
		return mdImage(
			"npm",
			`https://img.shields.io/npm/v/${package.name}.svg?style=popout&colorB=red`,
			`https://www.npmjs.com/package/${package.name}`,
		);
	},
	travis: package => {
		const {repo} = github(package.repository.url);
		return mdImage(
			"Travis CI",
			`https://img.shields.io/travis/com/${repo}.svg?style=popout`,
			`https://travis-ci.com/${repo}`,
		);
	},
};
