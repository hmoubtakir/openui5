/*!
 * ${copyright}
 */
/**
 * Defines support rules of the DynamicPage control of sap.f library.
 */
sap.ui.define(["sap/ui/support/library", "/sap/ui/table/library"],
	function(SupportLib, library) {
		"use strict";

		var Categories = SupportLib.Categories, // Accessibility, Performance, Memory, ...
			Severity = SupportLib.Severity, // Hint, Warning, Error
			Audiences = SupportLib.Audiences,
			VisibleRowCountMode = library.VisibleRowCountMode; // Control, Internal, Application

		var oDynamicPageFitContentRule = {
			id : "DynamicPageFitContentRule",
			title: "DynamicPage fitContent property recommendations",
			minversion: "1.42",
			audiences: [Audiences.Application],
			categories: [Categories.Usage],
			description: "It is recommended to use DynamicPage fitContent=false, when sap.m.Table is used, " +
				"or fitContent=true, when sap.ui.table.Table (with visibleRowCountMode=Auto) is used.",
			resolution: "Set fitContent property according to recommendations.",
			check: function (oIssueManager, oCoreFacade, oScope) {
				oScope.getElementsByClassName("sap.f.DynamicPage")
					.forEach(function(oElement) {

						var sElementId = oElement.getId(),
							oContent = oElement.getAggregation("content");

						if (oContent && oContent.isA("sap.m.Table") && oElement.getFitContent()) {
							oIssueManager.addIssue({
								severity: Severity.Medium,
								details: "It is recommended to use DynamicPage '" + "' (" + sElementId
									+ ") with fitContent=false, when sap.m.Table is used.",
								context: {
									id: sElementId
								}
							});
						}

						if (oContent && oContent.isA("sap.ui.table.Table")
							&& oContent.getVisibleRowCountMode() === VisibleRowCountMode.Auto
							&& !oElement.getFitContent()) {
							oIssueManager.addIssue({
								severity: Severity.Medium,
								details: "It is recommended to use DynamicPage '" + "' (" + sElementId +
									") with fitContent=true, when sap.ui.table.Table (with visibleRowCountMode=Auto) is used.",
								context: {
									id: sElementId
								}
							});
						}
				});
			}
		};

		return [oDynamicPageFitContentRule];

	}, true);