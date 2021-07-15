import { SiteClient } from "datocms-client";

export default async function receberRequest(resquest, response) {
	if (resquest.method === "POST") {
		const TOKEN = "fa54eff76291ac72427392eeb87003";
		const client = new SiteClient(TOKEN);

		const registroCriado = await client.items.create({
			itemType: "972274",
			...resquest.body,
			// title: "lasladfl",
			// imageUrl: "lnçlsfalsfn",
			// creatorSlug: "jovane",
			// url: "https://www.google.com",
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
