import { SiteClient } from "datocms-client";

export default async function receberRequest(resquest, response) {
	if (resquest.method === "POST") {
		const TOKEN = "fa54eff76291ac72427392eeb87003";
		const client = new SiteClient(TOKEN);

		const registroCriado = await client.items.create({
			itemType: "972274",
			...resquest.body,
			// title: "Gatsby",
			// imageUrl:
			// 	"https://camo.githubusercontent.com/b0972dd62bbf6ee0e28ed0ebceb48427a481568caeeb639066b23c754f0c60e5/68747470733a2f2f7777772e6761747362796a732e636f6d2f4761747362792d4d6f6e6f6772616d2e737667",
			// creatorSlug: "jovane",
			// url: "https://www.gatsby.com",
		});

		response.json({
			dados: "sfasfasdfasdf",
			registroCriado: registroCriado,
		});
		return;
	}
	response.status(404).json({
		message: "Ainda não temos nada no GET, mas no POST tem!",
	});
}
